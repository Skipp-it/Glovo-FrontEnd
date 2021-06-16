import React, { useRef, containerRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { axiosSpring } from '../../common/axios';
import Cookies from 'js-cookie';
import './StyleProvider.scss';
import S3 from 'react-aws-s3';

export default function AddRecipes() {
  const fileInput = useRef();
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const recipeNameRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  const register = async () => {
    const object = {
      name: recipeNameRef.current.value,
      description: descriptionRef.current.value,
      image: image,
    };

    let res = await axiosSpring.post('/recipes/addRecipe', object, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    });
    console.log('res', res);
    if (res.status === 202) {
      setError('');
      toast.success('Recipe was added!');
      window.location.href = '/recipes/all';
      return true;
    }
    toast.error('Try again');
    return false;
  };

  const handleUploadImage = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    let newFilename = fileInput.current.files[0].name;
    const config = {
      bucketName: 'images-team-delivery',
      region: 'eu-central-1',
      accessKeyId: 'AKIA6BTMWHJPQZNAQDPD',
      secretAccessKey: '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',
    };

    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFilename).then((data) => {
      if (data.status === 204) {
        toast.success('Image was added!');
        setImage(data.location);
      } else {
        toast.error('Upload failed');
      }
    });
  };

  return (
    <div>
      <Card className="recipe" ref={containerRef}>
        <Card.Body>
          <div className="header-recipe" id="name">
            Recipe
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleUploadImage}>
            <label>
              <input type="file" ref={fileInput} />
            </label>
            <button className="btn btn-info" type="submit">
              Upload
            </button>
          </form>
           <img src={image} style={{width: '200px', padding: '3%'}}/>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <Form.Group>
                <Form.Label id="name"> Recipe Name</Form.Label>
                <Form.Control type="text" ref={recipeNameRef} required />
              </Form.Group>
            </div>
            <Form.Label id="name">Description</Form.Label>
            <textarea
              className="form-group"
              type="textarea"
              ref={descriptionRef}
              required
            ></textarea>
            <Button className="btn" type="submit">
              Add recipe
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import ReviewFinder from '../../apis/ReviewFinder';

const AddReview = () => {
  const { id } = useParams(); // to get thre recipe id from the url
  const location = useLocation(); // gives access to the url
  const history = useHistory();
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('Rating');
  const [review, setReview] = useState('');

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const createdAt = new Date(timestampInSeconds * 1000);
    try {
      const body = {
        author,
        rating: rating === 'Rating' ? null : parseInt(rating),
        review,
        createdAt,
      };
      const { data } = await ReviewFinder.post(`/recipes/${id}`, body);
      history.push('/marielle');
      history.push(location.pathname);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="custom-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="review">Review</label>
            <textarea
              id="review"
              className="form-control"
              placeholder="Write a review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitReview}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;

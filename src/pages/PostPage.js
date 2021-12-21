import React from 'react';
import { url } from './../component/url';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { BiDislike, BiLike } from 'react-icons/bi';
import { UserContext } from './../context/UserContext';
import { AlertContext } from './../context/AlertContext';
import Failure from './../component/FailureSMS';
import Success from '../component/SuccessSMS';
export default function ServicePage() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const { user } = React.useContext(UserContext);
  const [tLike, setTLike] = React.useState(false);
  const { success, failure, failureAlert, successAlert } = React.useContext(AlertContext);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/blog`);
        const postData = response.data;
        setData(postData);
      } catch (err) {
        // failure(err.message);
      }
    };
    fetchData();
  }, [data]);

  const Dislike = async (id) => {
    if (!user) {
      failureAlert('Only users can react, please login');
      setTimeout(() => {
        failureAlert('');
      }, 4000);
    } else {
      const filteredData = data.filter((item) => {
        return id === item._id;
      });
      let count = filteredData[0].Like - 1;
      if (count < 0) {
        count = 0;
        let sendLike = await axios.post(`${url}/likes`, { like: count, email: user.username });

        if (sendLike.status === 201) {
          setTLike(!tLike);
          successAlert(sendLike.data);
          setTimeout(() => {
            successAlert('');
          }, 4000);
        }
      } else {
        let sendLike = await axios.post(`${url}/likes`, { like: count, email: user.username });
        setTLike(!tLike);
        if (sendLike.status === 201) {
          setTLike(!tLike);
          successAlert(sendLike.data);
          setTimeout(() => {
            successAlert('');
          }, 4000);
        }
      }
    }
  };

  const Like = async (id) => {
    if (!user) {
      failureAlert('Only users can react, please login');
      setTimeout(() => {
        failureAlert('');
      }, 4000);
    } else {
      const filteredData = data.filter((item) => {
        return id === item._id;
      });
      let count = filteredData[0].Like + 1;
      setTLike(!tLike);
      let sendLike = await axios.post(`${url}/likes`, { like: count, email: user.username });
      if (sendLike.status === 201) {
        setTLike(!tLike);
        successAlert(sendLike.data);
        setTimeout(() => {
          successAlert('');
        }, 4000);
      }
    }
  };
  if (data.length === 0) {
    return (
      <div className="container">
        <h2 style={{ textAlign: 'center' }}>
          {user ? (
            <>
              No post found in the database, click <a href="/form">Post Form</a> to add.
            </>
          ) : (
            <>
              No post found in the database, click <a href="/login">Login</a> and navigate to POST FORM.
            </>
          )}
        </h2>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h2>Blog Post</h2>
        {data.map((item) => {
          return (
            <div className="single-post">
              <span className="title">Posted By: {item.Email}</span>
              <h4>{item.Title.toUpperCase()}</h4>
              <p className="content">{item.Content}</p>
              <p className="btn-group">
                <p>{item.Like}</p>
                {tLike ? <BiDislike className="dislike" onClick={() => Dislike(item._id)} /> : <BiLike className="like" onClick={() => Like(item._id)} />}
              </p>
              {failure && <Failure />}
              {success && <Success />}
            </div>
          );
        })}
      </div>
    );
  }
}

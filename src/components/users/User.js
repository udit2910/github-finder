import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import Repo from '../repos/Repo';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, getUserRepos, repos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    html_url,
    public_gists,
    followers,
    public_repos,
    following,
    hireable,
    location,
    bio,
    login,
    company,
    blog,
  } = user;

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        back{' '}
      </Link>
      hireable{' '}
      {hireable ? (
        <i className='fas fa-check text-success'></i>
      ) : (
        <i className='fas fa-times-circle text-danger'></i>
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            alt=''
            className='round-img'
            style={{ width: '150px' }}
          />
        </div>
        <h1>{name}</h1>
        <p>location: {location}</p>
        <div>
          {bio && (
            <Fragment>
              <h3>bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            github profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>blog: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers:{followers}</div>
        <div className='badge badge-success'>following:{following}</div>
        <div className='badge badge-light'>public_repos:{public_repos}</div>
        <div className='badge badge-dark'>public_gists:{public_gists}</div>
      </div>
      <Repo repos={repos} />
    </Fragment>
  );
};

export default User;

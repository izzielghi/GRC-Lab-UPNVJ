import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Alert, Col, Row } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h1 className="display-4">Selamat Datang, Java Hipster!</h1>
        <p className="lead">Ini adalah halaman utama anda</p>
        {account?.login ? (
          <div>
            <Alert color="success">Anda masuk sebagai &quot;{account.login}&quot;.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              Jika anda ingin
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                masuk
              </Link>
              , anda bisa coba menggunakan akun yang sudah ada:
              <br />- Administrator (username=&quot;admin&quot; and password=&quot;admin&quot;) <br />- User (username=&quot;user&quot; and
              password=&quot;user&quot;).
            </Alert>

            <Alert color="warning">
              Anda belum punya akun?&nbsp;
              <Link to="/account/register" className="alert-link">
                Buat akun baru anda disini
              </Link>
            </Alert>
          </div>
        )}
        <p>Jika anda punya pertanyaan tentang JHipster:</p>

        <ul>
          <li>
            <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
              JHipster homepage
            </a>
          </li>
          <li>
            <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
              JHipster di Stack Overflow
            </a>
          </li>
          <li>
            <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
              JHipster bug tracker
            </a>
          </li>
          <li>
            <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
              JHipster chat publik
            </a>
          </li>
          <li>
            <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">
              ikuti @jhipster di Twitter
            </a>
          </li>
        </ul>

        <p>
          Jika anda menyukai JHipster, jangan lupa beri kami bintang di{' '}
          <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          !
        </p>
      </Col>
    </Row>
  );
};

export default Home;

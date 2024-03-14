import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
      <React.Fragment>
        <section class="content">
          <div class="error-page">
            <h2 class="headline text-warning"> 404</h2>

            <div class="error-content">
              <h3>
                <i class="fas fa-exclamation-triangle text-warning"></i> Oops!
                Page not found.
              </h3>

              <p>
                We could not find the page you were looking for. Meanwhile, you
                may <Link to="/">Go to home page</Link>
              </p>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
}

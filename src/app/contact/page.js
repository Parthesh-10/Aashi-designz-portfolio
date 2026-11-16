import Link from 'next/link';

export default async function Contact(props) {
  const searchParams = await props.searchParams;
  const success = searchParams?.success;
  const error = searchParams?.error;

  return (
    <>
      <div className="contactContainer">
        <div className="formWrapper">
          <div className="contactImg">
            <img src="/img/contactImg.png" alt="" />
          </div>

          <div className="contactForm">
            <h1>Let’s Get in Touch</h1>

            <form
              id="contactForm"
              className="form"
              action="/api/contact"
              method="POST"
            >
              <h3>Name</h3>
              <input className="name clickable" type="text" required name="name" />

              <h3>Email</h3>
              <input className="email clickable" type="email" required name="email" />
              <h3>Message</h3>
              <textarea
                className="message clickable"
                name="message"
                id=""
                rows="3"
                cols="20"
              ></textarea>
              <button className="formSubmit clickable">submit</button>
            </form>
            <p>
              You can also reach me directly at{' '}
              <a href="mailto:contact@aashidesignz.com">
                contact@aashidesignz.com
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {success && (
        <div className="popup" id="popup">
          <img src="/img/icon/confetti.png" alt="" />
          <h3>All set!</h3>
          <p>{success}</p>
        </div>
      )}
      
      {error && (
        <div className="popup" id="popup">
          <p>{error}</p>
        </div>
      )}
      
      <div className="spinner">
        <div className="spinnerInner"></div>
      </div>
    </>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="errorPage">
      <div className="error404Img">
        <img src="/img/errorImg.svg" alt="" />
      </div>
      <h3 className="error404Heading">Ohh Snap!! The Page Cannot be found.</h3>
      <Link href="/">
        <button className="error404Btn">Home Page</button>
      </Link>
    </div>
  );
}

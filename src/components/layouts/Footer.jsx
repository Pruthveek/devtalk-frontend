const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-100 fixed bottom-0 text-base-content p-4 z-40">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by DEVTALK.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;

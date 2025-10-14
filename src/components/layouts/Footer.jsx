const Footer = () => {
  return (
    <div>
      <footer className="footer text-xs md:text-base sm:footer-horizontal footer-center bg-base-100 fixed bottom-0 text-base-content py-4 z-40">
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

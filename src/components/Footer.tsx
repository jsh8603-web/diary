import { memo } from "react";

const Footer = memo(function Footer() {
  return (
    <footer className="border-t border-baby-border py-6 mt-auto">
      <div className="max-w-3xl mx-auto px-4 text-center text-xs text-baby-text-light">
        <p>소중한 매일을 기록합니다</p>
      </div>
    </footer>
  );
});

export default Footer;

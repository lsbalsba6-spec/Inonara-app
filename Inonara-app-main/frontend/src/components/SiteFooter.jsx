import { AFROATLAS_LOGO } from "../lib/brand";

export const SiteFooter = () => (
  <footer className="border-t border-[#2A2421] mt-24" data-testid="site-footer">
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        <img
          src={AFROATLAS_LOGO}
          alt="AfroAtlas"
          className="h-16 w-auto object-contain shrink-0"
          data-testid="footer-logo"
        />
        <p className="text-bone/60 text-sm max-w-md font-light">
          A cinematic, map-driven learning platform tracing African origins, empires,
          diaspora formation, and global cultural influence — grounded in scholarship.
        </p>
      </div>
      <p className="text-bone/40 text-xs">
        Content for educational purposes. Sources cited in each entry.
      </p>
    </div>
  </footer>
);

export default SiteFooter;

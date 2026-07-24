import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AskAtlasFab from "@/components/AskAtlasFab";
import Landing from "@/pages/Landing";
import Atlas from "@/pages/Atlas";
import Civilizations from "@/pages/Civilizations";
import CivilizationDetail from "@/pages/CivilizationDetail";
import { StoriesList, StoryDetail } from "@/pages/Stories";
import Compare from "@/pages/Compare";
import Culture from "@/pages/Culture";
import ModulePage from "@/pages/ModulePage";
import AskPage from "@/pages/AskPage";
import SearchPage from "@/pages/SearchPage";
import Journey from "@/pages/Journey";
import { DiasporaList, DiasporaDetail } from "@/pages/Diaspora";
import { EthnicGroupsList, EthnicGroupDetail } from "@/pages/EthnicGroups";
import { FiguresList, FigureDetail } from "@/pages/Figures";
import Timeline from "@/pages/Timeline";
import PlaceDetail from "@/pages/PlaceDetail";
import Inonara from "@/pages/Inonara";
import Worlds from "@/pages/Worlds";
import { I18nProvider } from "@/i18n";

const FALLBACK_IMG = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/cd856dce9d4cf5c71b306fa79ba1420d7d918092d25fc78b85217b73ddb7e2bc.png";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const handler = (e) => {
      const t = e.target;
      if (t && t.tagName === "IMG" && !t.dataset.fallbackApplied) {
        t.dataset.fallbackApplied = "1";
        t.src = FALLBACK_IMG;
      }
    };
    document.addEventListener("error", handler, true);
    return () => document.removeEventListener("error", handler, true);
  }, []);
  return null;
};

/**
 * Conditional shell — the AfroAtlas chrome (header / footer / Ask FAB) only
 * mounts inside the AfroAtlas world. The INONARA gateway pages ("/" and
 * "/worlds") render edge-to-edge without the AfroAtlas chrome.
 */
const INONARA_ONLY_PATHS = ["/", "/worlds"];

const Shell = () => {
  const { pathname } = useLocation();
  const isInonara = INONARA_ONLY_PATHS.includes(pathname);
  return (
    <>
      {!isInonara && <SiteHeader />}
      <main>
        <Routes>
          {/* INONARA gateway */}
          <Route path="/" element={<Inonara />} />
          <Route path="/worlds" element={<Worlds />} />
          {/* AfroAtlas world — original landing now lives at /afroatlas */}
          <Route path="/afroatlas" element={<Landing />} />
          {/* All existing AfroAtlas inner routes — unchanged */}
          <Route path="/atlas" element={<Atlas />} />
          <Route path="/civilizations" element={<Civilizations />} />
          <Route path="/civilization/:id" element={<CivilizationDetail />} />
          <Route path="/stories" element={<StoriesList />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/diaspora" element={<DiasporaList />} />
          <Route path="/diaspora/:id" element={<DiasporaDetail />} />
          <Route path="/people" element={<EthnicGroupsList />} />
          <Route path="/people/:id" element={<EthnicGroupDetail />} />
          <Route path="/figures" element={<FiguresList />} />
          <Route path="/figure/:id" element={<FigureDetail /> } />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
        </Routes>
      </main>
      {!isInonara && <SiteFooter />}
      {!isInonara && <AskAtlasFab />}
    </>
  );
};

function App() {
  return (
    <I18nProvider>
    <div className="App grain">
      <BrowserRouter>
        <ScrollToTop />
        <Shell />
      </BrowserRouter>
    </div>
    </I18nProvider>
  );
}

export default App;

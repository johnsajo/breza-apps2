import { Switch, Route, Router as WouterRouter } from "wouter";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Critique from "@/pages/Critique";
import Brief from "@/pages/Brief";
import Bridge from "@/pages/Bridge";
import Translate from "@/pages/Translate";
import Jury from "@/pages/Jury";
import Colour from "@/pages/Colour";
import Wordmark from "@/pages/Wordmark";
import Library from "@/pages/Library";
import Spark from "@/pages/Spark";
import ToneOfVoice from "@/pages/ToneOfVoice";
import Trophy from "@/pages/Trophy";
import Insight from "@/pages/Insight";
import Lineage from "@/pages/Lineage";
import Settings from "@/pages/Settings";
import HowItWorks from "@/pages/HowItWorks";
import About from "@/pages/About";
import FeedbackSummary from "@/pages/FeedbackSummary";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/critique" component={Critique} />
        <Route path="/brief" component={Brief} />
        <Route path="/bridge" component={Bridge} />
        <Route path="/translate" component={Translate} />
        <Route path="/jury" component={Jury} />
        <Route path="/colour" component={Colour} />
        <Route path="/wordmark" component={Wordmark} />
        <Route path="/library" component={Library} />
        <Route path="/spark" component={Spark} />
        <Route path="/tone" component={ToneOfVoice} />
        <Route path="/trophy" component={Trophy} />
        <Route path="/insight" component={Insight} />
        <Route path="/lineage" component={Lineage} />
        <Route path="/howitworks" component={HowItWorks} />
        <Route path="/settings" component={Settings} />
        <Route path="/about" component={About} />
        <Route path="/feedback-summary" component={FeedbackSummary} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </WouterRouter>
  );
}

export default App;

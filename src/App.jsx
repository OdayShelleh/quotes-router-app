import { Route, Routes, Navigate, Link } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
import Comments from "./components/comments/Comments";
import NewQuote from "./pages/NewQuote";
import EditQuote from "./pages/EditQuote";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="quotes" />} />
        <Route path="quotes">
          <Route index element={<AllQuotes />} />
          <Route path=":id/*" element={<QuoteDetail />}>
            <Route
              index
              element={
                <div className="centered">
                  <Link className="btn--flat" to="comments">
                    Show Comments
                  </Link>
                </div>
              }
            />
            <Route path="comments" element={<Comments />} />
          </Route>
        </Route>
        <Route path="new-quote" element={<NewQuote />} />
        <Route path="edit-quote/:id" element={<EditQuote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;

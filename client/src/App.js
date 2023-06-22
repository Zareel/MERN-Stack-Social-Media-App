import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
function App() {
  return (
    <div className="w-full h-full text-center">
      <div className="max-w-7xl mx-auto px-6 md:px-0">
        <div>
          <h1>Thinking Loud</h1>
        </div>
        <div className="w-full flex justify-between">
          <Posts />
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;

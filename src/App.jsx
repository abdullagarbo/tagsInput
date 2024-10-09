import IconTags from './components/UI/IconTags';
import TagInput from './components/TagInput';
import './App.css';

function App() {
  return (
    <>
      <div>
        <p className='logo'>
          <IconTags />
        </p>
      </div>
      <h1>Tags Input</h1>
      <TagInput />
    </>
  );
}

export default App;

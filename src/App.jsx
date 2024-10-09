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
        <h1>Tags Input</h1>
        <h5 className='green'>Green tags: known tags</h5>
        <h5 className='blue'>Blue tags: custom tags</h5>
      </div>
      <TagInput />
    </>
  );
}

export default App;

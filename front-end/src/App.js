import './App.css';
import logo from './assets/pwrlogo.png'
function App() {

  return (
    <div className='background'>
      <div className='center'>
        <div>
          <img src={logo} alt="logo"/>
        </div>
      <input type="text" name="pole[]" id="suggest3" autofocus="autofocus" autocomplete="off" class="ac_input"/>
      <input className="szukaj" type={'submit'} value=" "/>
      </div>
      
    </div>
  );
}

export default App;
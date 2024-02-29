import "./App.css";
import ContactForm from "./component/ContactForm/ContactForm";
import ContactHeader from "./component/ContactHeader/ContactHeader";
import Navigation from "./component/Navigation/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <main className="main_container">
        <ContactHeader />
        <ContactForm />
      </main>
    </div>
  );
}

export default App;
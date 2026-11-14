import { createRoot } from 'react-dom/client';
import '@fontsource/lato/latin-400.css';
import '@fontsource/lato/latin-700.css';
import '@fontsource/lato/latin-400-italic.css';
import './styles.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(<App />);

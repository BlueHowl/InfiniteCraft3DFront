import './app.css'
import App from './App.svelte'

import "sweetalert2/dist/sweetalert2.min.css";

const app = new App({
  target: document.getElementById('app')!,
})

export default app

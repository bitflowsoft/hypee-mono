
export default function App() {
  const hypee = useHypee();

  return (
    <div>
      <h1>Example Plugin</h1>
      <p>this is examplePlugin</p>
      <button onClick={() => {
        hypee.call('start');
      }}>macro start</button>
    </div>
  )
}
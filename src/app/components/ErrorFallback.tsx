export default function ErrorFallback({ message }: { message: string }) {
  return (
    <div className="error-fallback">
      <h2>Oops! Something went wrong.</h2>
      <p>{message}</p>
    </div>
  );
}

type errorDisplayProps = {
  message: string
}

const ErrorDisplay = ({ message } : errorDisplayProps) => {
  return (
    <div>{message}</div>
  )
}
export default ErrorDisplay

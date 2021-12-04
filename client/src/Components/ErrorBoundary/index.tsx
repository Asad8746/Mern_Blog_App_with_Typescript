import { Component, ErrorInfo } from "react"
export class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true }
    }
    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log("Error", error.message);
        console.log("Component Info", info);
    }

    render() {
        return this.state.hasError ? <div>Oops something goes wrong</div> : this.props.children
    }
}
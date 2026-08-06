import { Component } from "react";
import CountrySectionFallback from "./CountrySectionFallback";

export default class CountrySectionBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error, info) {
    console.error("Country dossier section failed", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <CountrySectionFallback
          title={this.props.title}
          message="Cette section contient des données encore incompatibles avec l’affichage. Elle reste accessible pendant sa correction."
        />
      );
    }

    return this.props.children;
  }
}

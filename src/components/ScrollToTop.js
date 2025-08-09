
export default function ScrollToTop() {
  return (
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
  )
}


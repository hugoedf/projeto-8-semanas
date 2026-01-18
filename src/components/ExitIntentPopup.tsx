
  useEffect(() => {
    // Check if already shown in this session
    const alreadyShown = sessionStorage.getItem('exit_popup_shown');
    const alreadyShown = sessionStorage.getItem("exit_popup_shown");
    if (alreadyShown) {
      setHasTriggered(true);
      return;
@@ -22,56 +22,56 @@ const ExitIntentPopup = () => {
      if (e.clientY <= 5 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem('exit_popup_shown', 'true');
        sessionStorage.setItem("exit_popup_shown", "true");
      }
    };

    // Mobile: Visibility change detection (when user switches tab/app)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasTriggered) {
        // Don't show immediately, wait for return
      if (document.visibilityState === "hidden" && !hasTriggered) {
        sessionStorage.setItem("exit_popup_pending", "true"); // CORREÇÃO APLICADA AQUI
      }
      if (document.visibilityState === 'visible' && !hasTriggered && !sessionStorage.getItem('exit_popup_shown')) {
      if (document.visibilityState === "visible" && !hasTriggered && !sessionStorage.getItem("exit_popup_shown")) {
        // Check if user was away for a bit
        const wasAway = sessionStorage.getItem('exit_popup_pending');
        const wasAway = sessionStorage.getItem("exit_popup_pending");
        if (wasAway) {
          setIsVisible(true);
          setHasTriggered(true);
          sessionStorage.setItem('exit_popup_shown', 'true');
          sessionStorage.removeItem('exit_popup_pending');
          sessionStorage.setItem("exit_popup_shown", "true");
          sessionStorage.removeItem("exit_popup_pending");
        }
      }
    };

    // Mobile: Back button / history state
    const handlePopState = () => {
      if (!hasTriggered && !sessionStorage.getItem('exit_popup_shown')) {
      if (!hasTriggered && !sessionStorage.getItem("exit_popup_shown")) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem('exit_popup_shown', 'true');
        sessionStorage.setItem("exit_popup_shown", "true");
        // Push state back to prevent actual navigation
        window.history.pushState(null, '', window.location.href);
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Push initial state for mobile back button detection
    window.history.pushState(null, '', window.location.href);
    window.history.pushState(null, "", window.location.href);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasTriggered]);

  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    trackInitiateCheckout(19.90, 'BRL');
    const baseUrl = "https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465";
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl );
    trackInitiateCheckout(19.90, "BRL");
    window.location.href = checkoutUrl;
  };

@@ -116,7 +116,7 @@ const ExitIntentPopup = () => {
          </p>

          {/* Urgency */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
          <div className="bg-red-500/10 border border-500/30 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-semibold">
              <Clock className="w-4 h-4" />

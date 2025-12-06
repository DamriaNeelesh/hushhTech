// Visitor ID Management for Anonymous Users
// Generates and persists visitor ID for chat access tracking

export function getOrCreateVisitorId(): string {
  // Try to get from localStorage
  let visitorId = localStorage.getItem('hushh_visitor_id');
  
  if (!visitorId) {
    // Generate new UUID
    visitorId = crypto.randomUUID();
    
    // Store in localStorage
    localStorage.setItem('hushh_visitor_id', visitorId);
    
    // Also store in cookie as backup (30 days)
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = `hushh_visitor=${visitorId}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }
  
  return visitorId;
}

export function clearVisitorId(): void {
  localStorage.removeItem('hushh_visitor_id');
  document.cookie = 'hushh_visitor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

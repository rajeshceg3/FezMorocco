from playwright.sync_api import sync_playwright
import time

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the local dev server
        page.goto("http://localhost:5173")

        # Wait for map and overlay to be ready
        page.wait_for_selector("#map")

        # Click "Begin the Walk" to remove the landing overlay
        # This is likely blocking the clicks on markers
        if page.is_visible(".landing-screen"):
             print("Clicking 'Begin the Walk'...")
             page.click(".btn-enter")
             time.sleep(2) # Wait for fade out

        # Wait for markers to render
        page.wait_for_selector(".leaflet-marker-icon")

        # Take a screenshot of the main map view (post-entry)
        page.screenshot(path="verification/map_view_entered.png")
        print("Screenshot taken: verification/map_view_entered.png")

        # Click on a marker to open detail panel (e.g., the first one)
        markers = page.locator(".leaflet-marker-icon")
        if markers.count() > 0:
            # Force click in case of subtle overlaps, though overlay should be gone
            markers.first.click(force=True)
            # Wait for detail panel to slide up
            try:
                page.wait_for_selector(".detail-panel.visible", timeout=5000)
                time.sleep(1) # Allow transition to finish
                page.screenshot(path="verification/detail_panel.png")
                print("Screenshot taken: verification/detail_panel.png")

                # Close panel
                page.click(".close-btn")
                time.sleep(1)
            except Exception as e:
                print(f"Detail panel did not open: {e}")

        # Test Filters
        # Open filter menu (Explore button toggles it)
        # Note: If category filter is visible by default (as per Navigation.js comments), we might not need to click Explore first,
        # but the dock logic suggests clicking explore toggles 'hidden' class on category-filter.
        # Let's check visibility.
        if not page.is_visible(".category-filter") or "hidden" in page.get_attribute(".category-filter", "class"):
             page.click(".dock-btn[data-id='explore']")
             time.sleep(0.5)

        # Click "Taste" (New category)
        page.click("button[data-category='Taste']")
        time.sleep(0.5)
        page.screenshot(path="verification/filtered_taste.png")
        print("Screenshot taken: verification/filtered_taste.png")

        # Click "Stay" (New category)
        page.click("button[data-category='Stay']")
        time.sleep(0.5)
        page.screenshot(path="verification/filtered_stay.png")
        print("Screenshot taken: verification/filtered_stay.png")

        browser.close()

if __name__ == "__main__":
    verify_frontend()

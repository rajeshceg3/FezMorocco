from playwright.sync_api import sync_playwright
import time

def verify_features():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto("http://localhost:5173")

        # Wait for map and click enter
        page.wait_for_selector(".btn-enter")
        page.click(".btn-enter")
        time.sleep(4) # Wait for map flyTo animation

        # Take screenshot of new custom markers
        page.screenshot(path="verification/custom_markers.png")
        print("Screenshot taken: verification/custom_markers.png")

        # Click a marker to open detail panel
        markers = page.locator(".custom-marker")
        if markers.count() > 0:
            markers.first.click(force=True)
            page.wait_for_selector(".detail-panel.visible", timeout=5000)
            time.sleep(1) # Allow transition to finish

            # Take screenshot of new detail panel with save, local tip, audio
            page.screenshot(path="verification/detail_panel_new.png")
            print("Screenshot taken: verification/detail_panel_new.png")

            # Click Save button
            page.click(".save-btn")
            time.sleep(0.5)

            # Take screenshot showing saved state
            page.screenshot(path="verification/detail_panel_saved.png")
            print("Screenshot taken: verification/detail_panel_saved.png")

            # Close panel
            page.click(".close-btn")
            time.sleep(1)

        # Click Saved filter in dock
        page.click(".dock-btn[data-id='saved']")
        time.sleep(1)

        # Take screenshot of filtered map
        page.screenshot(path="verification/filtered_saved.png")
        print("Screenshot taken: verification/filtered_saved.png")

        browser.close()

if __name__ == "__main__":
    verify_features()

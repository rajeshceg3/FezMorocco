from playwright.sync_api import sync_playwright
import time

def test_app():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Wait for Vite to start
        time.sleep(5)

        try:
            page.goto("http://localhost:5173")

            # Wait for landing screen to show, click enter to see map
            print("Clicking 'Begin the Walk'...")
            page.wait_for_selector(".btn-enter", timeout=10000)
            page.click(".btn-enter")

            # Wait for flyTo transition
            time.sleep(4)

            # Verify map exists
            print("Checking for map container...")
            page.wait_for_selector("#map", timeout=10000)
            print("Map container found.")

            # Verify markers
            # Markers might take a moment to render
            print("Checking for markers...")
            page.wait_for_selector(".custom-marker", timeout=10000)
            markers = page.locator(".custom-marker")
            count = markers.count()
            print(f"Found {count} markers.")

            if count == 11:
                print("SUCCESS: 11 markers confirmed.")
            else:
                print(f"FAILURE: Expected 11 markers, found {count}.")
                exit(1)
        except Exception as e:
             print(f"Test failed with error: {e}")
             exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    test_app()

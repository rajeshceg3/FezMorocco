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

            # Verify map exists
            print("Checking for map container...")
            page.wait_for_selector("#map", timeout=10000)
            print("Map container found.")

            # Verify markers
            # Markers might take a moment to render
            print("Checking for markers...")
            page.wait_for_selector(".leaflet-marker-icon", timeout=10000)
            markers = page.locator(".leaflet-marker-icon")
            count = markers.count()
            print(f"Found {count} markers.")

            if count == 8:
                print("SUCCESS: 8 markers confirmed.")
            else:
                print(f"FAILURE: Expected 8 markers, found {count}.")
                exit(1)
        except Exception as e:
             print(f"Test failed with error: {e}")
             exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    test_app()

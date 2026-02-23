import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    print("Navigating to app...")
    try:
        page.goto("http://localhost:3000")
    except Exception as e:
        print(f"Error navigating: {e}")
        return

    print("Waiting for map...")
    page.wait_for_selector("#map")

    print("Clicking marker...")
    # Wait for markers to appear
    page.wait_for_selector(".leaflet-marker-icon")
    markers = page.locator(".leaflet-marker-icon")
    # Click the first marker
    markers.first.click()

    print("Waiting for popup...")
    page.wait_for_selector(".leaflet-popup-content")

    print("Clicking Explore button...")
    explore_btn = page.locator(".btn-explore")
    expect(explore_btn).to_be_visible()
    explore_btn.click()

    print("Waiting for detail panel...")
    panel = page.locator("#detail-panel")
    # Check if visible class is added.
    # The class attribute should be "detail-panel visible"
    expect(panel).to_have_class(re.compile(r"visible"))

    # Verify content
    title = page.locator(".panel-title")
    print(f"Panel title: {title.inner_text()}")
    expect(title).not_to_be_empty()

    print("Waiting for transition...")
    page.wait_for_timeout(1000)

    # Debug styles
    box = panel.bounding_box()
    print(f"Panel bounding box: {box}")

    app_box = page.locator("#app").bounding_box()
    print(f"App bounding box: {app_box}")

    body_box = page.locator("body").bounding_box()
    print(f"Body bounding box: {body_box}")

    transform = panel.evaluate("element => window.getComputedStyle(element).transform")
    z_index = panel.evaluate("element => window.getComputedStyle(element).zIndex")
    display = panel.evaluate("element => window.getComputedStyle(element).display")
    bottom = panel.evaluate("element => window.getComputedStyle(element).bottom")
    left = panel.evaluate("element => window.getComputedStyle(element).left")
    position = panel.evaluate("element => window.getComputedStyle(element).position")

    print(f"Panel styles - Transform: {transform}, Z-Index: {z_index}, Display: {display}, Bottom: {bottom}, Left: {left}, Position: {position}")

    scroll_x = page.evaluate("window.scrollX")
    scroll_y = page.evaluate("window.scrollY")
    print(f"Scroll: {scroll_x}, {scroll_y}")

    print("Taking screenshot of viewport...")
    page.screenshot(path="verification_detail_panel.png")

    try:
        print("Taking screenshot of panel...")
        panel.screenshot(path="verification_panel_element.png")
    except Exception as e:
        print(f"Could not screenshot panel: {e}")

    browser.close()
    print("Done.")

with sync_playwright() as playwright:
    run(playwright)

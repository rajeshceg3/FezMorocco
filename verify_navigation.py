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

    print("Waiting for map and markers...")
    try:
        page.wait_for_selector(".leaflet-marker-icon", timeout=5000)
    except Exception:
        print("Markers did not load!")
        page.screenshot(path="verification_nav_fail.png")
        browser.close()
        return

    # Locators for markers
    # Note: Leaflet markers have 'title' attribute if we set it in L.marker options.
    sacred_marker = page.locator(".leaflet-marker-icon[title='Al-Attarine Madrasa']")
    craft_marker = page.locator(".leaflet-marker-icon[title='Chouara Tannery']")

    # Initial state: All visible
    print("Verifying initial state (All)...")
    expect(sacred_marker).to_be_visible()
    expect(craft_marker).to_be_visible()
    page.screenshot(path="verification_nav_all.png")

    # Click "Sacred"
    print("Clicking Sacred...")
    page.get_by_role("button", name="Sacred").click()

    # Verify filtering
    print("Verifying Sacred filter...")
    # Wait a bit for DOM update if needed, but playwright auto-waits for assertions usually.
    # However, removal from DOM might take a tick.
    expect(sacred_marker).to_be_visible()
    expect(craft_marker).not_to_be_visible()
    page.screenshot(path="verification_nav_sacred.png")

    # Click "Craft"
    print("Clicking Craft...")
    page.get_by_role("button", name="Craft").click()

    # Verify filtering
    print("Verifying Craft filter...")
    expect(sacred_marker).not_to_be_visible()
    expect(craft_marker).to_be_visible()
    page.screenshot(path="verification_nav_craft.png")

    # Click "Explore" (All)
    print("Clicking Explore...")
    page.get_by_role("button", name="Explore").click()

    # Verify all back
    print("Verifying All filter...")
    expect(sacred_marker).to_be_visible()
    expect(craft_marker).to_be_visible()
    page.screenshot(path="verification_nav_back_to_all.png")

    browser.close()
    print("Verification passed.")

with sync_playwright() as playwright:
    run(playwright)

import re
from playwright.sync_api import Page, expect

# Set your deployed URL or running localhost URL here
BASE_URL = "http://localhost:3000"

def test_homepage_has_correct_title_and_header(page: Page):
    """Test to verify homepage loads and the main elements are present."""
    page.goto(BASE_URL)
    
    # Verify the title contains Decor Dream DIY
    expect(page).to_have_title(re.compile("Decor Dream DIY"))
    
    # Check if the main hero title is visible
    hero_title = page.locator("h1", has_text="Create Your Dream Home with Ease.")
    expect(hero_title).to_be_visible()

def test_navigation_to_diy_guides(page: Page):
    """Test that the user can navigate to the DIY section from the homepage."""
    page.goto(BASE_URL)
    
    # Find the "Master DIY Guides" link/button and click it.
    diy_link = page.get_by_text("Master DIY Guides", exact=True)
    diy_link.click()
    
    # Confirm that the URL updated to the /diy route
    expect(page).to_have_url(re.compile(f"{BASE_URL}/diy"))
    
    # Confirm the DIY page header is visible
    diy_header = page.locator("h1", has_text="Practical DIY Guides")
    expect(diy_header).to_be_visible()

def test_navigation_to_browsing_ideas(page: Page):
    """Test that the user can click 'Browse Ideas' and go to exploration page."""
    page.goto(BASE_URL)
    
    # Click the Browse Ideas button
    browse_btn = page.locator("text=Browse Ideas")
    browse_btn.click()
    
    # Confirm URL update to /pins
    expect(page).to_have_url(re.compile(f"{BASE_URL}/pins"))
    
    # Verify the presence of the Pins page specific header
    explore_header = page.locator("h1", has_text="Decor & DIY Inspiration")
    expect(explore_header).to_be_visible()

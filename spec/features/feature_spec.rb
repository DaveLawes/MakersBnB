require_relative "../helpers"

feature "homepage" do

  it "displays login page from homepage" do
    visit "/"
    register
    register_second
    find("#login").click
    expect(page).to have_field("email")
    expect(page).to have_field("password")
    expect(page).to have_button("login")

    fill_in :email, with: 'zyxwv@test.com'
    fill_in :password, with: 'pwd12'
    click_button "Login"

    expect(page).to have_content("Welcome FirstName")
    expect(page).not_to have_content("BACKTRACE")
  end

  it "displays register page from homepage" do
    visit "/"
    find("#register").click
    expect(page).to have_field("name")
    expect(page).to have_field("email")
    expect(page).to have_field("password")
    expect(page).to have_button("register")

    fill_in :name, with: 'Andrew'
    fill_in :email, with: 'andrew@test.com'
    fill_in :password, with: 'pwd12'
    click_button "Register"

    expect(page).to have_content("Welcome Andrew")
    expect(page).not_to have_content("BACKTRACE")
  end
end

feature "homepage" do

  it "displays login page from homepage" do
    visit "/"
    find("#login").click
    expect(page).to have_field("email")
    expect(page).to have_field("password")
    expect(page).to have_button("login")
  end
end

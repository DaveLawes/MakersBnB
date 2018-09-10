def register
  visit("/")
  find("#register").click
  fill_in :name, with: 'FirstName'
  fill_in :email, with: 'zyxwv@test.com'
  fill_in :password, with: 'pwd12'
  click_button "Register"
end

def register_second
  visit("/")
  find("#register").click
  fill_in :name, with: 'NameTwo'
  fill_in :email, with: 'abcdef@test.com'
  fill_in :password, with: 'pwd120'
  click_button "Register"
end

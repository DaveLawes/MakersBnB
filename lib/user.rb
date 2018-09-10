class User < ActiveRecord::Base
  has_many :properties
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end

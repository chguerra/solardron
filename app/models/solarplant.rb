class Solarplant < ActiveRecord::Base
  has_many :reports
  belongs_to :client
end

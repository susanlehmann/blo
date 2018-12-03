module ApplicationHelper
	def ui_translations(section)
		translations = {current: I18n.t('.')[:vue][section]}
		translations.to_json.html_safe
	end
end

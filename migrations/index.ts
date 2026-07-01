import * as migration_20260622_084302_init from './20260622_084302_init';
import * as migration_20260622_095924_add_about_method_steps from './20260622_095924_add_about_method_steps';
import * as migration_20260622_103252_remove_pricing_unit from './20260622_103252_remove_pricing_unit';
import * as migration_20260624_120000_add_homepage_gallery from './20260624_120000_add_homepage_gallery';
import * as migration_20260624_140000_add_gallery_page from './20260624_140000_add_gallery_page';
import * as migration_20260624_150000_add_gallery_photos from './20260624_150000_add_gallery_photos';
import * as migration_20260624_160000_add_gallery_page_hero from './20260624_160000_add_gallery_page_hero';
import * as migration_20260626_070000_add_footer_legal_settings from './20260626_070000_add_footer_legal_settings';
import * as migration_20260626_073000_add_legal_pages from './20260626_073000_add_legal_pages';
import * as migration_20260629_070038_autosave_drafts from './20260629_070038_autosave_drafts';
import * as migration_20260701_120000_add_location_page from './20260701_120000_add_location_page';
import * as migration_20260701_130000_fix_location_intro_lexical from './20260701_130000_fix_location_intro_lexical';

export const migrations = [
  {
    up: migration_20260622_084302_init.up,
    down: migration_20260622_084302_init.down,
    name: '20260622_084302_init',
  },
  {
    up: migration_20260622_095924_add_about_method_steps.up,
    down: migration_20260622_095924_add_about_method_steps.down,
    name: '20260622_095924_add_about_method_steps',
  },
  {
    up: migration_20260622_103252_remove_pricing_unit.up,
    down: migration_20260622_103252_remove_pricing_unit.down,
    name: '20260622_103252_remove_pricing_unit',
  },
  {
    up: migration_20260624_120000_add_homepage_gallery.up,
    down: migration_20260624_120000_add_homepage_gallery.down,
    name: '20260624_120000_add_homepage_gallery',
  },
  {
    up: migration_20260624_140000_add_gallery_page.up,
    down: migration_20260624_140000_add_gallery_page.down,
    name: '20260624_140000_add_gallery_page',
  },
  {
    up: migration_20260624_150000_add_gallery_photos.up,
    down: migration_20260624_150000_add_gallery_photos.down,
    name: '20260624_150000_add_gallery_photos',
  },
  {
    up: migration_20260624_160000_add_gallery_page_hero.up,
    down: migration_20260624_160000_add_gallery_page_hero.down,
    name: '20260624_160000_add_gallery_page_hero',
  },
  {
    up: migration_20260626_070000_add_footer_legal_settings.up,
    down: migration_20260626_070000_add_footer_legal_settings.down,
    name: '20260626_070000_add_footer_legal_settings',
  },
  {
    up: migration_20260626_073000_add_legal_pages.up,
    down: migration_20260626_073000_add_legal_pages.down,
    name: '20260626_073000_add_legal_pages',
  },
  {
    up: migration_20260629_070038_autosave_drafts.up,
    down: migration_20260629_070038_autosave_drafts.down,
    name: '20260629_070038_autosave_drafts'
  },
  {
    up: migration_20260701_120000_add_location_page.up,
    down: migration_20260701_120000_add_location_page.down,
    name: '20260701_120000_add_location_page'
  },
  {
    up: migration_20260701_130000_fix_location_intro_lexical.up,
    down: migration_20260701_130000_fix_location_intro_lexical.down,
    name: '20260701_130000_fix_location_intro_lexical'
  },
];

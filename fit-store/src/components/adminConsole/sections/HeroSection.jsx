import React, { useEffect, useState } from 'react';
import {
  useGetHeroQuery,
  useCreateHeroMutation,
  useUpdateHeroMutation,
} from '../../../store/api/heroApi';
import '../AdminConsole.css';

const emptyForm = {
  hero_tag: '',
  hero_heading_line1: '',
  hero_heading_highlight: '',
  hero_heading_line2: '',
  hero_description: '',
  hero_image: '',
  hero_primary_button_text: '',
  hero_primary_button_link: '',
  hero_secondary_button_text: '',
  hero_secondary_button_link: '',
};

export default function HeroSection() {
  const { data, isLoading, isError, error } = useGetHeroQuery();
  const [createHero, { isLoading: isCreating, error: createError }] = useCreateHeroMutation();
  const [updateHero, { isLoading: isUpdating, error: updateError }] = useUpdateHeroMutation();

  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        hero_tag: data.hero_tag || '',
        hero_heading_line1: data.hero_heading_line1 || '',
        hero_heading_highlight: data.hero_heading_highlight || '',
        hero_heading_line2: data.hero_heading_line2 || '',
        hero_description: data.hero_description || '',
        hero_image: data.hero_image || '',
        hero_primary_button_text: data.hero_primary_button_text || '',
        hero_primary_button_link: data.hero_primary_button_link || '',
        hero_secondary_button_text: data.hero_secondary_button_text || '',
        hero_secondary_button_link: data.hero_secondary_button_link || '',
      });
    }
  }, [data]);

  const isExisting = Boolean(data?.id);
  const isSaving = isCreating || isUpdating;
  const saveError = createError || updateError;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isExisting) {
        await updateHero(form).unwrap();
      } else {
        await createHero(form).unwrap();
      }
      setSaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <div className="grid-status">Loading...</div>;
  if (isError && error?.status !== 404) {
    return <div className="grid-status error">Error: {error?.data?.message || 'Failed to load'}</div>;
  }

  return (
    <section className="admin-console-section">
      <h3 className="admin-console-section-title">Hero Banner</h3>

      <form className="admin-console-form" onSubmit={handleSubmit}>
        {saveError && (
          <p className="admin-console-error">
            {saveError?.data?.message || saveError?.data?.error || 'Failed to save'}
          </p>
        )}
        {saved && <p className="admin-console-success">Saved successfully.</p>}

        <div className="admin-console-field">
          <label>Tag</label>
          <input
            type="text"
            value={form.hero_tag}
            onChange={handleChange('hero_tag')}
            placeholder="FALL 2026 TRAINING EDIT"
          />
        </div>

        <div className="admin-console-row">
          <div className="admin-console-field">
            <label>Heading Line 1</label>
            <input
              type="text"
              value={form.hero_heading_line1}
              onChange={handleChange('hero_heading_line1')}
              placeholder="Style is"
              required
            />
          </div>
          <div className="admin-console-field">
            <label>Heading Highlight</label>
            <input
              type="text"
              value={form.hero_heading_highlight}
              onChange={handleChange('hero_heading_highlight')}
              placeholder="a way to say"
            />
          </div>
        </div>

        <div className="admin-console-field">
          <label>Heading Line 2</label>
          <input
            type="text"
            value={form.hero_heading_line2}
            onChange={handleChange('hero_heading_line2')}
            placeholder="who you are."
          />
        </div>

        <div className="admin-console-field">
          <label>Description</label>
          <textarea
            rows={3}
            value={form.hero_description}
            onChange={handleChange('hero_description')}
          />
        </div>

        <div className="admin-console-field">
          <label>Image URL</label>
          <input type="text" value={form.hero_image} onChange={handleChange('hero_image')} />
        </div>

        <div className="admin-console-row">
          <div className="admin-console-field">
            <label>Primary Button Text</label>
            <input
              type="text"
              value={form.hero_primary_button_text}
              onChange={handleChange('hero_primary_button_text')}
              placeholder="SHOP COLLECTION"
            />
          </div>
          <div className="admin-console-field">
            <label>Primary Button Link</label>
            <input
              type="text"
              value={form.hero_primary_button_link}
              onChange={handleChange('hero_primary_button_link')}
              placeholder="/collections/fall-2026"
            />
          </div>
        </div>

        <div className="admin-console-row">
          <div className="admin-console-field">
            <label>Secondary Button Text</label>
            <input
              type="text"
              value={form.hero_secondary_button_text}
              onChange={handleChange('hero_secondary_button_text')}
              placeholder="WATCH CAMPAIGN"
            />
          </div>
          <div className="admin-console-field">
            <label>Secondary Button Link</label>
            <input
              type="text"
              value={form.hero_secondary_button_link}
              onChange={handleChange('hero_secondary_button_link')}
              placeholder="/campaign/fall-2026"
            />
          </div>
        </div>

        <div className="admin-console-actions">
          <button type="submit" className="admin-console-btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : isExisting ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </section>
  );
}

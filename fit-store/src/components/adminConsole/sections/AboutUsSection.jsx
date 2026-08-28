import React, { useEffect, useState } from 'react';
import {
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
} from '../../../store/apiSlice';
import '../AdminConsole.css';

const emptyForm = {
  about_us_img: '',
  about_us_title: '',
  about_us_description: '',
  about_us_tagline1: '',
  about_us_tagline2: '',
  about_us_tagline3: '',
  about_us_tagline4: '',
  about_us_estb_year: '',
  about_us_visit_us: '',
  about_us_email: '',
};

export default function AboutUsSection() {
  const { data, isLoading, isError, error } = useGetAboutUsQuery();
  const [createAboutUs, { isLoading: isCreating, error: createError }] = useCreateAboutUsMutation();
  const [updateAboutUs, { isLoading: isUpdating, error: updateError }] = useUpdateAboutUsMutation();

  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        about_us_img: data.about_us_img || '',
        about_us_title: data.about_us_title || '',
        about_us_description: data.about_us_description || '',
        about_us_tagline1: data.about_us_tagline1 || '',
        about_us_tagline2: data.about_us_tagline2 || '',
        about_us_tagline3: data.about_us_tagline3 || '',
        about_us_tagline4: data.about_us_tagline4 || '',
        about_us_estb_year: data.about_us_estb_year || '',
        about_us_visit_us: data.about_us_visit_us || '',
        about_us_email: data.about_us_email || '',
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
        await updateAboutUs(form).unwrap();
      } else {
        await createAboutUs(form).unwrap();
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
      <h3 className="admin-console-section-title">About Us</h3>

      <form className="admin-console-form" onSubmit={handleSubmit}>
        {saveError && (
          <p className="admin-console-error">
            {saveError?.data?.message || saveError?.data?.error || 'Failed to save'}
          </p>
        )}
        {saved && <p className="admin-console-success">Saved successfully.</p>}

        <div className="admin-console-field">
          <label>Image URL</label>
          <input type="text" value={form.about_us_img} onChange={handleChange('about_us_img')} />
        </div>

        <div className="admin-console-field">
          <label>Title</label>
          <input
            type="text"
            value={form.about_us_title}
            onChange={handleChange('about_us_title')}
            required
          />
        </div>

        <div className="admin-console-field">
          <label>Description</label>
          <textarea
            rows={4}
            value={form.about_us_description}
            onChange={handleChange('about_us_description')}
          />
        </div>

        <div className="admin-console-row">
          <div className="admin-console-field">
            <label>Tagline 1</label>
            <input
              type="text"
              value={form.about_us_tagline1}
              onChange={handleChange('about_us_tagline1')}
            />
          </div>
          <div className="admin-console-field">
            <label>Tagline 2</label>
            <input
              type="text"
              value={form.about_us_tagline2}
              onChange={handleChange('about_us_tagline2')}
            />
          </div>
        </div>

        <div className="admin-console-row">
          <div className="admin-console-field">
            <label>Tagline 3</label>
            <input
              type="text"
              value={form.about_us_tagline3}
              onChange={handleChange('about_us_tagline3')}
            />
          </div>
          <div className="admin-console-field">
            <label>Tagline 4</label>
            <input
              type="text"
              value={form.about_us_tagline4}
              onChange={handleChange('about_us_tagline4')}
            />
          </div>
        </div>

        <div className="admin-console-row">
          <div className="admin-console-field">
            <label>Established Year</label>
            <input
              type="text"
              value={form.about_us_estb_year}
              onChange={handleChange('about_us_estb_year')}
            />
          </div>
          <div className="admin-console-field">
            <label>Email</label>
            <input type="email" value={form.about_us_email} onChange={handleChange('about_us_email')} />
          </div>
        </div>

        <div className="admin-console-field">
          <label>Visit Us (Address)</label>
          <input
            type="text"
            value={form.about_us_visit_us}
            onChange={handleChange('about_us_visit_us')}
          />
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

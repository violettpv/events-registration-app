import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '@css/RegisterForm.module.css';

export default function RegisterForm() {
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    heardFrom: '',
  });

  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    heardFrom: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    const fullNameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullNameRegex.test(formData.fullName)) {
      errors.fullName = 'Full name must be in "First Last" format.';
      isValid = false;
    }
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required.';
      isValid = false;
    }
    if (!formData.heardFrom) {
      errors.heardFrom = 'Please select where you heard about this event.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form data submitted:', formData);
    } else {
      console.log('Form data validation failed:', formErrors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3>Event Registration</h3>
        <h3>{eventId} TITLE!</h3>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <label>Full name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={formErrors.fullName ? styles.errorInput : ''}
              required
            />
            {formErrors.fullName && (
              <p className={styles.errorText}>{formErrors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? styles.errorInput : ''}
              required
            />
            {formErrors.email && <p className={styles.errorText}>{formErrors.email}</p>}
          </div>

          {/* Date of Birth */}
          <div className={styles.formGroup}>
            <label>Date of birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={formErrors.dateOfBirth ? styles.errorInput : ''}
              required
            />
            {formErrors.dateOfBirth && (
              <p className={styles.errorText}>{formErrors.dateOfBirth}</p>
            )}
          </div>

          {/* Heard From */}
          <div className={styles.formGroup}>
            <label>Where did you hear about this event?</label>
            <div className={styles.checkboxAnswers}>
              <label>
                <input
                  type="radio"
                  name="heardFrom"
                  value="social_media"
                  checked={formData.heardFrom === 'social_media'}
                  onChange={handleChange}
                />
                <span>Social Media</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="heardFrom"
                  value="friends"
                  checked={formData.heardFrom === 'friends'}
                  onChange={handleChange}
                />
                <span>Friends</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="heardFrom"
                  value="found_myself"
                  checked={formData.heardFrom === 'found_myself'}
                  onChange={handleChange}
                />
                <span>Found Myself</span>
              </label>
            </div>
            {formErrors.heardFrom && (
              <p className={styles.errorText}>{formErrors.heardFrom}</p>
            )}
          </div>

          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

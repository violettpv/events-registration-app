import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '@css/RegisterForm.module.css';
import { getEvent, registerParticipant } from '@app/http';

export default function RegisterForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    dateOfBirth: '',
    heardAbout: '',
  });

  const [formErrors, setFormErrors] = useState({
    fullname: '',
    email: '',
    dateOfBirth: '',
    heardAbout: '',
  });

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const event = await getEvent(eventId);
        setEvent(event);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEventDetails();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    const fullnameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullnameRegex.test(formData.fullname)) {
      errors.fullname = 'Full name must be in "First Last" format.';
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
    if (!formData.heardAbout) {
      errors.heardAbout = 'Please select where you heard about this event.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await registerParticipant(eventId, formData);
        alert('Your registration was successful.');
        navigate(`/${eventId}`);
      } catch (error) {
        console.log(error);
        alert('Failed to register participant.');
      }
    } else {
      // console.log('Form data validation failed:', formErrors);
      alert('Please correct the errors in the form.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3>Event Registration</h3>
        <h3>{event.title}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Full name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={formErrors.fullname ? styles.errorInput : ''}
              required
            />
            {formErrors.fullname && (
              <p className={styles.errorText}>{formErrors.fullname}</p>
            )}
          </div>
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
          <div className={styles.formGroup}>
            <label>Where did you hear about this event?</label>
            <div className={styles.checkboxAnswers}>
              <label>
                <input
                  type="radio"
                  name="heardAbout"
                  value="social_media"
                  checked={formData.heardAbout === 'social_media'}
                  onChange={handleChange}
                />
                <span>Social Media</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="heardAbout"
                  value="friends"
                  checked={formData.heardAbout === 'friends'}
                  onChange={handleChange}
                />
                <span>Friends</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="heardAbout"
                  value="found_myself"
                  checked={formData.heardAbout === 'found_myself'}
                  onChange={handleChange}
                />
                <span>Found Myself</span>
              </label>
            </div>
            {formErrors.heardAbout && (
              <p className={styles.errorText}>{formErrors.heardAbout}</p>
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

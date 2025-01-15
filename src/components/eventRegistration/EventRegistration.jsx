import { useEventRegistrationContext } from '@/hooks/useEventRegistration';

const EventRegistration = () => {
  const { registrationCodes, setRegistrationCodes } =
    useEventRegistrationContext();

  console.log(registrationCodes);

  return (
    <div>
      {registrationCodes?.length > 0 ? (
        registrationCodes.map((code, index) => (
          <div key={code.id || index}>{code.message}</div>
        ))
      ) : (
        <p>No registrations found.</p>
      )}
    </div>
  );
};

export default EventRegistration;

import { useState, type FormEvent } from "react";
import { LocationSection } from "../components/LocationSection";
import { InfoGrid, PageBody, PageHeader, Section } from "../components/ui";
import { school } from "../data/schoolData";

const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  // Demo only: no backend yet, so we just show a confirmation.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Reach the school office for enquiries" />
      <PageBody>
        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Contact Information">
            <InfoGrid
              single
              items={[
                { label: "Address", value: school.address },
                { label: "Phone", value: <a href={`tel:+91${school.phone.replace(/\D/g, "")}`} className="text-brand-600 hover:underline">{school.phone}</a> },
                { label: "Official email", value: <a href={`mailto:${school.email}`} className="text-brand-600 hover:underline">{school.email}</a> },
                { label: "Principal", value: school.principalName },
                { label: "Office timings", value: school.officeTimings },
              ]}
            />
          </Section>

          <Section title="Enquiry Form">
            {submitted && (
              <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800 ring-1 ring-green-200" role="status">
                Thank you. Your enquiry has been recorded (demo — not sent anywhere yet).
              </div>
            )}
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Name *
                <input required name="name" className={`${inputClass} mt-1`} />
              </label>
              <label className="text-sm font-medium">
                Phone *
                <input required name="phone" type="tel" pattern="[0-9 +-]{10,15}" className={`${inputClass} mt-1`} />
              </label>
              <label className="text-sm font-medium sm:col-span-2">
                Email
                <input name="email" type="email" className={`${inputClass} mt-1`} />
              </label>
              <label className="text-sm font-medium sm:col-span-2">
                Subject *
                <select required name="subject" className={`${inputClass} mt-1 bg-white`} defaultValue="">
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option>Admission enquiry</option>
                  <option>Transfer certificate</option>
                  <option>Examination / results</option>
                  <option>General enquiry</option>
                </select>
              </label>
              <label className="text-sm font-medium sm:col-span-2">
                Message *
                <textarea required name="message" rows={4} className={`${inputClass} mt-1`} />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="rounded-md bg-brand-700 px-6 py-2.5 font-semibold text-white hover:bg-brand-800">
                  Submit enquiry
                </button>
              </div>
            </form>
          </Section>
        </div>

        <LocationSection />
      </PageBody>
    </>
  );
}

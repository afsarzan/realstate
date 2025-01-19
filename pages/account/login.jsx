import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Nav } from "components";

import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Login;

function Login() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    alertService.clear();
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="card bg-gray-200 flex flex-col min-h-screen login-screen">
          <Nav />
        <div className="mt-20 m-auto mb-20">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                  <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Investor login</h1>
                    <p className="py-6">
                      Provident cupiditate voluptatem et in. Quaerat fugiat ut
                      assumenda excepturi exercitationem quasi. In deleniti
                      eaque aut repudiandae et a id nisi.
                    </p>
                  </div>
                  <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                          name="username"
                          type="text"
                          {...register("username")}
                          className={`input input-bordered w-full max-w-xs ${
                            errors.username ? "is-invalid" : ""
                          }`}
                        />
                        <div className="invalid-feedback">
                          {errors.username?.message}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          name="password"
                          type="password"
                          {...register("password")}
                          className={`input input-bordered w-full max-w-xs ${
                            errors.password ? "is-invalid" : ""
                          }`}
                        />
                        <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>
                      </div>
                      <button
                        disabled={formState.isSubmitting}
                        className="btn btn-primary"
                      >
                        {formState.isSubmitting && (
                          <span className="spinner-border spinner-border-sm me-1"></span>
                        )}
                        Login
                      </button>
                      <Link href="/account/register" className="btn btn-link">
                        Register
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

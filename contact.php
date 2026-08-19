<?php include 'header.php'; ?>

        <section id="section-hero" class="section-dark no-top no-bottom text-light jarallax relative mh-500 jarallax">
            <img src="images/background/4.webp" class="jarallax-img" alt="">
            <div class="gradient-edge-bottom h-50"></div>
            <div class="sw-overlay op-5"></div>
            <div class="abs w-80 bottom-10 z-2 w-100">
                <div class="container">
                    <div class="row align-items-center justify-content-between gx-5">
                        <div class="col-lg-6">
                            <div class="relative wow mask-right">
                                <div class="text-start">
                                    <h1 class="fs-96 text-uppercase fs-sm-10vw mb-0 lh-1">Contact</h1>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 wow fadeInRight" data-wow-delay=".3s">
                            <p class="mb-0">Join thought leaders, developers, researchers, and founders as we explore how artificial intelligence is reshaping industries, creativity.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="section-dark relative">
            <div class="container">
              <div class="row align-items-center justify-content-center">
                <div class="col-lg-6">
                    <div class="subtitle">Get In Touch</div>
                    <h2 class="wow fadeInUp">Weâ€™re here to answer your questions.</h2>

                    <p class="col-lg-8">Have a question, suggestion, or just want to say hi? Weâ€™re here and happy to hear from you!</p>

                    <div class="spacer-single"></div>

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="relative mb-4">
                                <i class="abs fs-28 p-3 bg-color text-light rounded-1 icofont-location-pin"></i>
                                <div class="ms-80px">
                                    <h4 class="mb-0">Event Location</h4>
                                    121 AI Blvd, San Francisco, BCA 94107
                                </div>
                            </div>

                            <div class="relative mb-4">
                                <i class="abs fs-28 p-3 bg-color text-light rounded-1 icofont-envelope"></i>
                                <div class="ms-80px">
                                    <h4 class="mb-0">Send a Message</h4>
                                    contact@aivent-support.com
                                </div>
                            </div>

                            <div class="relative mb-4">
                                <i class="abs fs-28 p-3 bg-color text-light rounded-1 icofont-phone"></i>
                                <div class="ms-80px">
                                    <h4 class="mb-0">Call Us Directly</h4>
                                    +1 123 456 789
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>

                <div class="col-lg-6">
                    <div class="bg-dark-2 rounded-1 p-60 relative">
                        <form name="contactForm" id="contact_form" method="post" action="#">
                        <div class="row g-4">
                            <div class="col-lg-12">
                                <h3>Get In Touch</h3>
                                <p>Have a question, suggestion, or just want to say hi? Fill out the form below and weâ€™ll get back to you soon.</p>

                                <div class="field-set">
                                    <input type="text" name="name" id="name" class="form-underline" placeholder="Your Name" required>
                                </div>

                                <div class="field-set">
                                    <input type="text" name="email" id="email" class="form-underline" placeholder="Your Email" required>
                                </div>

                                <div class="field-set">
                                    <input type="text" name="phone" id="phone" class="form-underline" placeholder="Your Phone" required>
                                </div>

                                <div class="field-set">
                                    <textarea name="message" id="message" class="form-underline h-100px" placeholder="Your Message" required></textarea>
                                </div>
                            </div>
                        </div>
                            
                        
                        <div class="g-recaptcha" data-sitekey="6LdW03QgAAAAAJko8aINFd1eJUdHlpvT4vNKakj6"></div>
                        <div id='submit' class="mt-3">
                            <input type='submit' id='send_message' value='Send Message' class="btn-main">
                        </div>

                        <div id="success_message" class='success'>
                            Your message has been sent successfully. Refresh this page if you want to send more messages.
                        </div>
                        <div id="error_message" class='error'>
                            Sorry there was an error sending your form.
                        </div>
                    </form>
                    </div>
                </div>
              </div>
            </div>
        </section>        

    </div>

    <?php include 'footer.php'; ?>
